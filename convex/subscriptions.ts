import { v } from "convex/values"

import { internalMutation } from "./_generated/server"

export const create = internalMutation({
    args: {
        orgId: v.string(),
        stripePriceId: v.string(),
        stripeCustomerId: v.string(),
        stripeSubscriptionId: v.string(),
        stripeCurrentPeriodEnd: v.number(),

    },
    handler: async (ctx, {
        orgId,
        stripePriceId,
        stripeCustomerId,
        stripeSubscriptionId,
        stripeCurrentPeriodEnd
    }) => {
        return await ctx.db.insert("orgSubscription", {
            orgId,
            stripePriceId,
            stripeCustomerId,
            stripeSubscriptionId,
            stripeCurrentPeriodEnd
        })
    }
})

export const update = internalMutation({
    args: {
        stripeSubscriptionId: v.string(),
        stripeCurrentPeriodEnd: v.number()

    },
    handler: async (ctx, {
        stripeSubscriptionId,
        stripeCurrentPeriodEnd
    }) => {
        try {
            const existingSubscription = await ctx.db.query("orgSubscription").withIndex("by_subscription", (q) => q.eq("stripeSubscriptionId", stripeSubscriptionId)).unique()
        } catch (e) {
            console.error(e)
            return { success: false }
        }

    }
})