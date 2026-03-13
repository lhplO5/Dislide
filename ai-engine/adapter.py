from docling.document_converter import ConversionResult
from docling.datamodel.document import DocItemLabel

class DislideAdapter:
    def __init__(self):
        self.version = "1.0"

    def process(self, conversion_result: ConversionResult, filename: str) -> dict:
        doc = conversion_result.document
        
        schema = {
            "version": self.version,
            "metadata": {
                "title": doc.name or "Slide",
                "source_pdf": filename,
                "page_number": len(doc.pages) if doc.pages else 1
            },
            "blocks": []
        }

        block_counter = 1
        for item, level in doc.iterate_items():
            block_id = f"block-{block_counter}"
            block_counter += 1
            
            if item.label in [DocItemLabel.TITLE, DocItemLabel.SECTION_HEADER]:
                h_level = 1 if item.label == DocItemLabel.TITLE else 2
                schema["blocks"].append({
                    "id": block_id,
                    "type": "heading",
                    "properties": {"level": h_level},
                    "content": item.text,
                    "floating_elements": []
                })

            elif item.label == DocItemLabel.FORMULA:
                schema["blocks"].append({
                    "id": block_id,
                    "type": "math",
                    "content": item.text,
                    "floating_elements": []
                })

            elif item.label == DocItemLabel.LIST_ITEM:
                schema["blocks"].append({
                    "id": block_id,
                    "type": "paragraph",
                    "content": f"• {item.text}",
                    "floating_elements": []
                })

            elif item.label in [DocItemLabel.PARAGRAPH, DocItemLabel.TEXT]:
                schema["blocks"].append({
                    "id": block_id,
                    "type": "paragraph",
                    "content": item.text,
                    "floating_elements": []
                })
                
            else:
                continue

        return schema