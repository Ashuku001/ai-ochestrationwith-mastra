from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors

def create_okr_pdf(filename):
    doc = SimpleDocTemplate(filename, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Title
    story.append(Paragraph("OKR Report: Financial Resilience", styles['Title']))
    story.append(Spacer(1, 24))

    # Objective Section
    story.append(Paragraph("Objective", styles['Heading2']))
    story.append(Paragraph("<b>Title:</b> Build a highly automated backend ecosystem that drives institutional efficiency and resilience.", styles['Normal']))
    story.append(Paragraph("<b>Owner:</b> Ashuku Ezra", styles['Normal']))
    story.append(Paragraph("<b>Cycle:</b> 1000 orders by end of the year", styles['Normal']))
    story.append(Paragraph("<b>Priority:</b> Medium", styles['Normal']))
    story.append(Paragraph("<b>Status:</b> Not Started", styles['Normal']))
    story.append(Spacer(1, 12))

    # Key Results Table
    story.append(Paragraph("Key Results", styles['Heading3']))
    data = [
        ["Key Result", "Target", "Status"],
        ["Automate 80% of manual data reconciliation tasks between the Student Record System and Finance systems.", "80%", "Not Started"],
        ["Reduce cloud infrastructure spend by 10% through the implementation of auto-scaling and spot instance usage.", "10%", "Not Started"],
        ["Resolve 100% of 'Critical' and 'High' security vulnerabilities within 48 hours of detection.", "100%", "Not Started"]
    ]

    t = Table(data, colWidths=[300, 70, 80])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(t)
    story.append(Spacer(1, 24))

    # Summary
    story.append(Paragraph("Summary", styles['Heading3']))
    story.append(Paragraph("This objective directly supports the university's strategic goal of Financial Resilience by focusing on operational efficiency, cost reduction, and risk mitigation through backend automation.", styles['Normal']))

    doc.build(story)

if __name__ == "__main__":
    create_okr_pdf("Financial_Resilience_OKR.pdf")
