const Subscription = {
  userSubscription: {
    subscribe: async (parent, args, context) => {
      return context.prisma.$subscribe
        .user({
          mutation_in: ['CREATED', 'UPDATED'],
        })
        .node()
    },
    resolve: payload => {
      return payload
    },
  },
}

module.exports = { Subscription }
