## Protocol Liquidation data extraction service

- Add protocol configuration in config.json to start extracting liquidation history for the protocol

### example config for Aave V2

```{
  "serviceName": "protocol-liquidation-data-extraction",
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
      "active": true
    },
    ...
  ]
}
```
