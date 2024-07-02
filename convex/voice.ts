import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByChannel = query({
    args: {
        channel: v.string(),
    },
    handler: async (ctx, {channel}) => {
        const voice = await ctx.db.query("voice").filter((q) => q.eq(q.field("channel"), channel)).order("desc").take(1);
        return voice;
    }
});


export const setToken = mutation({
    args: {
        channel: v.string(),
        token: v.string(),
        expire: v.number(),
    },
    handler: async (ctx, { channel, token, expire }) => {
        await ctx.db.insert("voice", { channel, token, expire });
    }
});


export const updateToken = mutation({
    args: {
        id: v.id("voice"),
        token: v.string(),
    },
    handler: async (ctx, { id, token }) => {
        await ctx.db.patch(id, { token });
    }
})
