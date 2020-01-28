const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      links.forEach((link) => {
        if (link.id === args.id) {
          link.id = args.id;
          link.url = args.url;
          link.description = args.description;
        }
        return link;
      });
    },
    deleteLink: (root, args) => {
      const index = links.findIndex(item => item.id === args.id);
      const link = links[index];
      links.splice(link, 1);

      return link;
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))