import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type RGB } from "pdf-lib";
import { PRODUCT, SITE, SUPPORT } from "@/lib/constants";
import type { InvoicePayload } from "@/lib/invoice";
import { formatInvoiceDateFr, formatInvoiceDateOnlyFr } from "@/lib/invoice";

const PAGE_W = 595;
const PAGE_H = 842;
const MARGIN = 56;
const CONTENT_W = PAGE_W - MARGIN * 2;

const PLUM: RGB = rgb(0.361, 0.239, 0.31);
const INK: RGB = rgb(0.09, 0.075, 0.078);
const MUTED: RGB = rgb(0.42, 0.4, 0.41);
const LINE: RGB = rgb(0.82, 0.82, 0.84);
const TABLE_HEAD: RGB = rgb(0.945, 0.942, 0.94);
const WHITE: RGB = rgb(1, 1, 1);

const HEADER_H = 102;
const xQty = MARGIN + 278;
const xUnit = MARGIN + 312;
const xAmtRight = PAGE_W - MARGIN - 6;
const DESC_MAX = 248;

function cleanPdfText(input: string): string {
  return input
    .replace(/\u202f/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/[\u2000-\u200b]/g, " ")
    .replace(/\u2019/g, "'")
    .replace(/\u2018/g, "'")
    .trim();
}

function wrapToLines(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const s = cleanPdfText(text);
  const words = s.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  const pushCurrent = () => {
    if (current) lines.push(current);
    current = "";
  };

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    try {
      if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
        current = candidate;
        continue;
      }
    } catch {
      /* suite */
    }

    pushCurrent();

    try {
      if (font.widthOfTextAtSize(word, fontSize) <= maxWidth) {
        current = word;
        continue;
      }
    } catch {
      current = "";
    }

    let acc = "";
    for (const ch of word) {
      const next = acc + ch;
      try {
        if (font.widthOfTextAtSize(next, fontSize) <= maxWidth) acc = next;
        else {
          if (acc) lines.push(acc);
          acc = ch;
        }
      } catch {
        if (acc) lines.push(acc);
        acc = "?";
      }
    }
    current = acc;
  }
  pushCurrent();

  return lines.length > 0 ? lines : [""];
}

function drawHLine(page: PDFPage, y: number, x0: number, width: number, color: RGB, thickness = 0.45) {
  page.drawRectangle({ x: x0, y, width, height: thickness, color });
}

function drawTextRight(
  page: PDFPage,
  text: string,
  rightX: number,
  baselineY: number,
  size: number,
  font: PDFFont,
  color: RGB,
) {
  const t = cleanPdfText(text);
  const w = font.widthOfTextAtSize(t, size);
  page.drawText(t, { x: rightX - w, y: baselineY, size, font, color });
}

export async function buildInvoicePdfBytes(payload: InvoicePayload): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  let page: PDFPage = doc.addPage([PAGE_W, PAGE_H]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  let y = PAGE_H - MARGIN;

  const ensureSpace = (neededFromBottom: number) => {
    if (neededFromBottom < MARGIN + 80) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      return PAGE_H - MARGIN;
    }
    return neededFromBottom;
  };

  const drawLines = (lines: string[], size: number, f: PDFFont, color: RGB, lineGap: number) => {
    for (const ln of lines) {
      y = ensureSpace(y);
      page.drawText(ln, { x: MARGIN, y, size, font: f, color });
      y -= lineGap;
    }
  };

  const sectionLabel = (label: string) => {
    y = ensureSpace(y);
    page.drawText(label, { x: MARGIN, y, size: 7.5, font: fontBold, color: PLUM });
    y -= 10;
  };

  // --- Bandeau ---
  page.drawRectangle({
    x: 0,
    y: PAGE_H - HEADER_H,
    width: PAGE_W,
    height: HEADER_H,
    color: PLUM,
  });

  page.drawText("FACTURE", {
    x: MARGIN,
    y: PAGE_H - 40,
    size: 22,
    font: fontBold,
    color: WHITE,
  });

  const subtitle = cleanPdfText(`${SITE.name} · ${PRODUCT.name}`);
  page.drawText(subtitle.length > 54 ? `${subtitle.slice(0, 51)}...` : subtitle, {
    x: MARGIN,
    y: PAGE_H - 62,
    size: 8.5,
    font,
    color: rgb(0.96, 0.94, 0.96),
  });

  const metaRight = PAGE_W - MARGIN;
  drawTextRight(page, `Ref. ${payload.orderId}`, metaRight, PAGE_H - 36, 8, font, rgb(0.95, 0.93, 0.96));
  drawTextRight(
    page,
    `Date d'émission : ${formatInvoiceDateOnlyFr(payload.orderDate)}`,
    metaRight,
    PAGE_H - 52,
    8,
    font,
    rgb(0.95, 0.93, 0.96),
  );

  y = PAGE_H - HEADER_H - 32;

  // --- Émetteur ---
  sectionLabel("ÉMETTEUR");
  drawLines(wrapToLines(SITE.name, fontBold, 12, CONTENT_W), 12, fontBold, INK, 15);
  drawLines(wrapToLines(PRODUCT.shortDescription, font, 9, CONTENT_W), 9, font, MUTED, 12);
  drawLines(wrapToLines(cleanPdfText(SITE.url), font, 9, CONTENT_W), 9, font, MUTED, 12);
  drawLines(wrapToLines(SUPPORT.email, font, 9, CONTENT_W), 9, font, MUTED, 12);
  drawLines(wrapToLines(SUPPORT.phone, font, 9, CONTENT_W), 9, font, MUTED, 12);
  y -= 6;
  y = ensureSpace(y);
  drawHLine(page, y, MARGIN, CONTENT_W, LINE);
  y -= 16;

  // --- Client ---
  sectionLabel("FACTURATION");
  drawLines(wrapToLines(payload.customerName, fontBold, 11, CONTENT_W), 11, fontBold, INK, 14);
  drawLines(wrapToLines(payload.customerEmail, font, 9, CONTENT_W), 9, font, MUTED, 12);
  y -= 6;
  y = ensureSpace(y);
  drawHLine(page, y, MARGIN, CONTENT_W, LINE);
  y -= 18;

  // --- Détail (tableau) ---
  y = ensureSpace(y);
  page.drawText("Détail de la commande", { x: MARGIN, y, size: 10, font: fontBold, color: INK });
  y -= 16;

  const rowH = 22;
  const headBaseline = y - 14;
  page.drawRectangle({
    x: MARGIN,
    y: y - rowH,
    width: CONTENT_W,
    height: rowH,
    color: TABLE_HEAD,
    borderColor: LINE,
    borderWidth: 0.6,
  });

  page.drawText("Désignation", { x: MARGIN + 6, y: headBaseline, size: 9, font: fontBold, color: INK });
  page.drawText("Qté", { x: xQty, y: headBaseline, size: 9, font: fontBold, color: INK });
  page.drawText("Prix unit.", { x: xUnit, y: headBaseline, size: 9, font: fontBold, color: INK });
  drawTextRight(page, "Montant TTC", xAmtRight, headBaseline, 9, fontBold, INK);

  const descLines = wrapToLines(PRODUCT.name, font, 9.5, DESC_MAX);
  const innerPad = 10;
  const bodyH = Math.max(descLines.length, 1) * rowH + innerPad * 2;
  const bodyBottom = y - rowH - bodyH;

  page.drawRectangle({
    x: MARGIN,
    y: bodyBottom,
    width: CONTENT_W,
    height: bodyH,
    color: WHITE,
    borderColor: LINE,
    borderWidth: 0.6,
  });

  const firstBase = bodyBottom + bodyH - innerPad - 4;
  descLines.forEach((ln, i) => {
    page.drawText(ln, {
      x: MARGIN + 6,
      y: firstBase - i * rowH,
      size: 9.5,
      font,
      color: INK,
    });
  });

  const qtyY = firstBase - ((descLines.length - 1) * rowH) / 2;
  page.drawText("1", { x: xQty, y: qtyY, size: 9.5, font, color: INK });
  page.drawText(payload.amountLabel, { x: xUnit, y: qtyY, size: 9.5, font, color: INK });
  drawTextRight(page, payload.amountLabel, xAmtRight, qtyY, 9.5, fontBold, INK);

  y = bodyBottom - 8;
  y = ensureSpace(y);
  drawHLine(page, y, MARGIN, CONTENT_W, LINE);
  y -= 12;

  drawTextRight(page, "Total TTC", xUnit + 78, y, 10, fontBold, INK);
  drawTextRight(page, payload.amountLabel, xAmtRight, y, 12, fontBold, PLUM);
  y -= 24;

  drawLines([`Devise : ${payload.currency}`], 8.5, font, MUTED, 12);
  y -= 8;
  y = ensureSpace(y);
  drawHLine(page, y, MARGIN, CONTENT_W, LINE, 0.35);
  y -= 16;

  y = ensureSpace(y);
  page.drawText("Paiement", { x: MARGIN, y, size: 9, font: fontBold, color: INK });
  y -= 12;
  drawLines([`Référence : ${cleanPdfText(payload.paymentReference)}`], 9, font, MUTED, 12);
  drawLines([`Horodatage : ${formatInvoiceDateFr(payload.orderDate)}`], 9, font, MUTED, 12);
  y -= 10;

  y = ensureSpace(y);
  drawLines(
    wrapToLines(
      "Document généré électroniquement — valant reçu de paiement pour un produit numérique (TVA selon la réglementation applicable).",
      font,
      7.5,
      CONTENT_W,
    ),
    7.5,
    font,
    MUTED,
    10,
  );
  drawLines([`Merci pour votre confiance · ${SITE.name}`], 8.5, fontBold, PLUM, 12);

  return doc.save();
}
