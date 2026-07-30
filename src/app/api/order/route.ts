import { NextResponse } from "next/server";

interface OrderPayload {
  productName?: string;
  productSlug?: string;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  name?: string;
  phone?: string;
  address?: string;
  locale?: string;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_ORDER_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_ORDER_WEBHOOK_URL is not set");
    return NextResponse.json(
      { success: false, error: "Order webhook is not configured." },
      { status: 500 }
    );
  }

  let payload: OrderPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!payload.name || !payload.phone || !payload.address) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const rawText = await response.text();
    console.log("[order webhook] status:", response.status, "redirected:", response.redirected, "finalUrl:", response.url);
    console.log("[order webhook] raw response (first 500 chars):", rawText.slice(0, 500));

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    let result: {
      success?: boolean;
      error?: string;
      spreadsheetUrl?: string;
      spreadsheetName?: string;
      sheetName?: string;
      rowWritten?: number;
    };
    try {
      result = JSON.parse(rawText);
    } catch {
      throw new Error(
        `Webhook did not return JSON (got ${response.status}, content starting with: ${rawText.slice(0, 120)})`
      );
    }

    if (result?.success !== true) {
      throw new Error(result?.error ?? "Webhook did not confirm success");
    }

    console.log(
      "[order webhook] wrote row", result.rowWritten,
      "to sheet", JSON.stringify(result.sheetName),
      "in spreadsheet", JSON.stringify(result.spreadsheetName),
      "-", result.spreadsheetUrl
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[order webhook] Failed to forward order to Google Sheets:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Could not save the order.",
        debug: process.env.NODE_ENV !== "production" ? String(error) : undefined,
      },
      { status: 502 }
    );
  }
}
