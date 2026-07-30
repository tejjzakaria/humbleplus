/**
 * Humble+ order webhook.
 *
 * Setup:
 * 1. Open the exact Google Sheet you want orders logged to (not a new
 *    standalone script — it must be attached to this sheet, see step 2).
 * 2. In that sheet: Extensions > Apps Script. (Going to script.google.com
 *    directly and creating a blank project does NOT bind it to any sheet —
 *    getActiveSpreadsheet() would then have nothing to write to.)
 * 3. Delete any starter code and paste this whole file in.
 * 4. Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL (ends in /exec) and set it as
 *    GOOGLE_SHEETS_ORDER_WEBHOOK_URL in the Next.js app's .env.local.
 * 6. Every time you edit this script, create a new deployment (or use
 *    "Manage deployments" > edit > New version) for the change to go live —
 *    saving the script alone does not update an existing /exec URL.
 *
 * Orders land in a tab named "Orders" (created automatically) — if you only
 * ever see "Sheet1", scroll the tab bar at the bottom, the "Orders" tab is
 * likely there. The response also includes spreadsheetUrl/sheetName so the
 * Next.js server logs can confirm exactly where each row was written.
 */

var SHEET_NAME = "Orders";

var HEADER_ROW = [
  "Date",
  "Produit",
  "Quantité",
  "Prix unitaire (MAD)",
  "Total (MAD)",
  "Nom",
  "Téléphone",
  "Adresse",
  "Langue",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (!data.name || !data.phone || !data.address) {
      return jsonResponse({ success: false, error: "Missing required fields." });
    }

    var sheet = getOrCreateSheet();

    sheet.appendRow([
      new Date(),
      data.productName || "",
      data.quantity || "",
      data.unitPrice || "",
      data.totalPrice || "",
      data.name || "",
      data.phone || "",
      data.address || "",
      data.locale || "",
    ]);

    // Returned so the caller's server logs show exactly which spreadsheet/row
    // got written — open spreadsheetUrl and check the "Orders" tab if rows
    // don't seem to be showing up where you expect.
    return jsonResponse({
      success: true,
      spreadsheetUrl: sheet.getParent().getUrl(),
      spreadsheetName: sheet.getParent().getName(),
      sheetName: sheet.getName(),
      rowWritten: sheet.getLastRow(),
    });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse({ status: "ok", message: "Humble+ order webhook is running." });
}

function getOrCreateSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER_ROW);
    sheet.getRange(1, 1, 1, HEADER_ROW.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
