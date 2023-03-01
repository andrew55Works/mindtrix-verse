import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { getPanguApiDomain } from '../../utils/config.web.utils';

const panguApiDomain = getPanguApiDomain();
const link = new HttpLink({ uri: `${panguApiDomain}/graphql` });
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;
