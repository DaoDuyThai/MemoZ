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
        organizationId: v.string()
    },
    handler: async (ctx, { body, authorId, organizationId }) => {
        // Create a new message
        await ctx.db.insert("messages", { body, authorId, organizationId });
    }
});

export const getByOrganizationId = query({
    args: {
        organizationId: v.string()
    },
    handler: async (ctx, { organizationId }) => {
        // Receive 100 messages
        const messages = await ctx.db.query("messages").filter((q) => q.eq(q.field("organizationId"), organizationId)).order("desc").take(100);
        return messages.reverse();
    }
});

