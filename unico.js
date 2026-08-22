/**
 * SAMACK 697 — CRACHÁ ÚNICO ASSAÍ ATACADISTA
 * Geração de 1 Crachá por Folha A4 Paisagem (Landscape)
 */

function gerarPdfUnico(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (typeof rawItems === "undefined" || !rawItems || rawItems.length === 0) {
        alert("Carregue uma planilha do Assaí antes de gerar o PDF.");
        return;
    }

    const iniVal = document.getElementById("input-inicio")?.value.trim();
    const fimVal = document.getElementById("input-fim")?.value.trim();

    let filtered = rawItems;
    if (iniVal || fimVal) {
        const minArea = iniVal ? parseInt(iniVal, 10) : 0;
        const maxArea = fimVal ? parseInt(fimVal, 10) : 999999;
        filtered = rawItems.filter(item => {
            const num = parseInt(item.area, 10);
            if (!isNaN(num)) return num >= minArea && num <= maxArea;
            return true;
        });
    }

    if (filtered.length === 0) {
        alert("Nenhum item encontrado dentro do filtro de área informado.");
        return;
    }

    const { jsPDF } = window.jspdf;
    // A4 Paisagem (841.89 x 595.28 pt)
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

    for (let i = 0; i < filtered.length; i++) {
        if (i > 0) doc.addPage();
        const isFirstOrLast = (i === 0 || i === filtered.length - 1 || Math.random() < 0.25);
        desenharCrachaUnicoAssai(doc, filtered[i], isFirstOrLast);
    }

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
}

function drawAutoFitTextUnico(doc, text, fontStyle, maxFontSize, minFontSize, maxWidth, x, y, align = "left") {
    if (!text && text !== 0) return;
    const str = String(text).trim();
    if (!str) return;

    let fontSize = maxFontSize;
    doc.setFont("helvetica", fontStyle);
    doc.setFontSize(fontSize);

    while (fontSize > minFontSize) {
        if (doc.getTextWidth(str) <= maxWidth) break;
        fontSize -= 1;
        doc.setFontSize(fontSize);
    }
    doc.text(str, x, y, { align: align });
}

function desenharCrachaUnicoAssai(doc, item, isFirstOrLast) {
    const PAGE_W = 841.89;
    const PAGE_H = 595.28;

    const margin = 35.0;
    const X_LEFT = margin;
    const X_RIGHT = PAGE_W - margin;
    const W = X_RIGHT - X_LEFT; // ~771.89 pt
    const CARD_H = PAGE_H - (margin * 2); // ~525.28 pt
    const yStart = margin;

    doc.saveGraphicsState();

    // Assinatura
    if (isFirstOrLast) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.setTextColor(243, 112, 33);
        doc.text("by Samack 697", X_LEFT, margin - 12);
    }

    doc.setLineWidth(2.0);
    doc.setDrawColor(0, 0, 0);
    doc.setTextColor(0, 0, 0);

    // Retângulo externo
    doc.rect(X_LEFT, yStart, W, CARD_H);

    // Linhas divisórias horizontais proporcionais
    const l1 = yStart + (CARD_H * 0.18); // Abaixo de SKU / Área
    const l2 = yStart + (CARD_H * 0.44); // Abaixo de Descrição
    const l3 = yStart + (CARD_H * 0.52); // Abaixo dos headers Produto/Qtd
    const l4 = yStart + (CARD_H * 0.84); // Abaixo dos valores Produto/Qtd

    doc.setLineWidth(1.2);
    [l1, l2, l3, l4].forEach(ly => {
        doc.line(X_LEFT, ly, X_RIGHT, ly);
    });

    // Linha vertical divisória entre Produto e Quantidade (68% / 32%)
    const xSplit = X_LEFT + (W * 0.68);
    doc.line(xSplit, l2, xSplit, l4);

    // --- ROW 1: SKU & ÁREA ---
    doc.setFont("helvetica", "bold");
    drawAutoFitTextUnico(doc, item.sku, "bold", 65, 24, (W * 0.65) - 30, X_LEFT + 30, yStart + (CARD_H * 0.13), "left");
    drawAutoFitTextUnico(doc, item.area, "bold", 60, 24, 200, X_RIGHT - 30, yStart + (CARD_H * 0.13), "right");

    // --- ROW 2: DESCRIÇÃO ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.text("DESCRIÇÃO", X_LEFT + (W / 2), yStart + (CARD_H * 0.24), { align: "center" });
    drawAutoFitTextUnico(doc, item.descricao, "bold", 36, 14, W - 40, X_LEFT + (W / 2), yStart + (CARD_H * 0.36), "center");

    // --- ROW 3: CABEÇALHOS PRODUTO & QUANTIDADE ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.text("PRODUTO", X_LEFT + 30, yStart + (CARD_H * 0.50));
    doc.text("QUANTIDADE", X_RIGHT - 30, yStart + (CARD_H * 0.50), { align: "right" });

    // --- ROW 4: VALORES PRODUTO & QUANTIDADE ---
    drawAutoFitTextUnico(doc, item.barcode, "bold", 58, 20, (W * 0.68) - 40, X_LEFT + 25, yStart + (CARD_H * 0.72), "left");
    drawAutoFitTextUnico(doc, item.quantidade, "bold", 65, 20, 180, X_RIGHT - 40, yStart + (CARD_H * 0.73), "right");

    // --- ROW 5: VALIDADE ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.text("VALIDADE", X_LEFT + 30, yStart + (CARD_H * 0.94));
    doc.text("___________ / ___________ / ___________", X_LEFT + 180, yStart + (CARD_H * 0.94));

    doc.restoreGraphicsState();
}