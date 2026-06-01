import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "../layout/ui/Button.jsx";

function readProductsFromDOM() {
  const cards = document.querySelectorAll("[data-product-card]");
  return Array.from(cards).map((card) => {
    const price = card.getAttribute("data-product-price") ?? "";
    const priceValue = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
    return {
      name: card.getAttribute("data-product-name") ?? "",
      price,
      priceValue,
      description: card.getAttribute("data-product-description") ?? "",
      category: card.getAttribute("data-product-category") ?? "",
    };
  });
}

function buildSystemPrompt(products) {
  const catalog =
    products.length > 0
      ? products
          .map(
            (p, i) =>
              `${i + 1}. ${p.name} — ${p.price}${p.category ? ` | Category: ${p.category}` : ""} | ${p.description}`
          )
          .join("\n")
      : "No products are currently listed on the page.";

  return (
    "You are ShoeVerse AI, a shopping and navigation assistant for the ShoeVerse website.\n" +
    "You have direct access to the current product catalog shown on this page.\n" +
    "Never say you lack access to the catalog or cannot see products.\n\n" +
    "CURRENT PRODUCT CATALOG (live from the page):\n" +
    catalog +
    "\n\n" +
    "PAGE SECTIONS: Hero (top of page), Featured Collection (product cards), About, Footer.\n\n" +
    "BEHAVIOR RULES:\n" +
    "- Only recommend products that exist in the catalog above with their exact names and prices.\n" +
    "- If a user asks for products under a budget, compare against the actual prices listed.\n" +
    "- If no product matches the user's request, say so honestly.\n" +
    "- Keep every response to 2-3 sentences maximum.\n" +
    "- Be friendly, direct, and helpful.\n" +
    "- If a user asks to navigate, scroll, be shown, or find a product visually, include the exact token NAVIGATE_TO_COLLECTION in your response and the page will scroll automatically.\n" +
    "- If asked about unrelated topics (electronics, politics, general knowledge, etc.), respond: 'I can only assist with ShoeVerse products and shoe-related questions.'\n" +
    "- Never invent products or prices not in the catalog above."
  );
}

const WELCOME_MESSAGE = "Hi! I am ShoeVerse AI. Ask me anything about our shoes.";
const MODEL = "claude-haiku-4-5-20251001";

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [displayMessages, setDisplayMessages] = useState([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    if (!apiKey) {
      console.error("[ShoeVerse AI] VITE_CLAUDE_API_KEY is not set.");
      return;
    }

    setInput("");

    const nextDisplay = [
      ...displayMessages,
      { role: "user", content: trimmed },
    ];
    setDisplayMessages(nextDisplay);
    setIsLoading(true);

    const products = readProductsFromDOM();
    const systemPrompt = buildSystemPrompt(products);

    console.log("[ShoeVerse AI] Live products read from DOM:", products);
    console.log(`[ShoeVerse AI] Sending ${nextDisplay.length - 1} user message(s) using model: ${MODEL}`);

    const apiMessages = nextDisplay.filter(
      (m) => m.content !== WELCOME_MESSAGE
    );

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 256,
          system: systemPrompt,
          messages: apiMessages,
        }),
      });

      console.log("[ShoeVerse AI] Status:", response.status, response.statusText);
      const bodyText = await response.text();
      console.log("[ShoeVerse AI] Response body:", bodyText);

      if (!response.ok) {
        throw new Error(`API error ${response.status}: ${bodyText}`);
      }

      const data = JSON.parse(bodyText);
      let reply = data.content[0].text;
      console.log("[ShoeVerse AI] Reply received successfully.");

      const shouldNavigate = reply.includes("NAVIGATE_TO_COLLECTION");
      reply = reply.replace(/NAVIGATE_TO_COLLECTION/g, "").replace(/\s{2,}/g, " ").trim();

      if (shouldNavigate) {
        document.getElementById("featured-collection")?.scrollIntoView({ behavior: "smooth" });
        if (!reply) {
          reply = "I've taken you to our Featured Collection section where you can view that product.";
        }
      }

      setDisplayMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      console.error("[ShoeVerse AI] Request failed:", err);
      setDisplayMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 md:right-8 w-[350px] h-[500px] bg-background border rounded-2xl shadow-xl flex flex-col overflow-hidden z-50"
          >
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                ShoeVerse AI
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
                onClick={() => setIsOpen(false)}
                data-testid="button-close-chat"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-secondary/30">
              {!apiKey && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                  Please configure your Claude API key (VITE_CLAUDE_API_KEY) to enable AI chat.
                </div>
              )}

              {displayMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${msg.role}-${i}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card border rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-background border-t">
              <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our shoes..."
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                  rows={1}
                  disabled={!apiKey || isLoading}
                  data-testid="input-chat-message"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full h-10 w-10 shrink-0"
                  disabled={!input.trim() || !apiKey || isLoading}
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="fixed bottom-6 right-4 md:right-8 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-toggle-chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </>
  );
}