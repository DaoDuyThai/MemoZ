import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        // Receive 100 messages
        const messages = await ctx.db.query("messages").order("desc").take(100);
        return messages.reverse();
    }
});


export const send = mutation({
    args: {
        body: v.string(),
        authorId: v.string(),
    },
    handler: async (ctx, { body, authorId }) => {
        // Create a new message
        await ctx.db.insert("messages", { body, authorId });
    }
});