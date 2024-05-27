## Searcher Profit indexer from liquidations

## setup guide

1. Install dependencies `npm install`
2. Install aws serverless cli `npm install -g serverless`
3. Login to serverless cli `sls login`

### example config for Aave V2

```{
  "interval": 10,
  "serviceName": "searcher-profit-indexer",
  "protocols": [
    {
      "subgraph": "https://gateway.thegraph.com/api/{GraphAPIKEY}/subgraphs/id/84CvqQHYhydZzr2KSth8s1AFYpBRzUbVJXq6PWuZm9U9",
      "name": "Aave V2 ethereum",
      "icon": "https://icons.llamao.fi/icons/protocols/aave?w=48&h=48",
      "chainId": 1,
      "startDate": "2/5/2024",
      "protocolVersion": "aaveV2",
      "etherscanApiKey": "xxxxx",
      "graphApiKey": "xxxx",
      "lendingPool": "xxxx",
      "aaveOracle": "xxxx",
      "rpcs": ["https://eth.llamarpc.com"]
    },
    ...
  ]
}
```

4. Invoke Lambda locally for testing `sls invoke local -f indexBlock`
5. Deploy Lambda to aws `sls deploy`
