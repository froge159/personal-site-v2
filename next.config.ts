import withBundleAnalyzer from '@next/bundle-analyzer';


const nextConfig = {}
 

const withBundleAnalyzerConfigured = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',});


export default withBundleAnalyzerConfigured(nextConfig);
 
