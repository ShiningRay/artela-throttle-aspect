# Throttle Aspect

## Use Case Summary

**Throttle Aspect** enables contracts to limit the frequency of invokation.

**Typical Senario**:
- In airdrop, limit the per address claim frequency.
- For hot projects, protect from DDoS.

## Team Members and Roles
Team Member

1: [ShiningRay](https://github.com/ShiningRay/) - Core Dev

## Problem Addressed

在很多场景中， 我们不希望某些特定的接口、方法被频繁调用， 因此提出了限流的概念。 例如， 在网页前端使用键入同时触发搜索的功能， 为了防止用户频繁触发搜索， 我们可以设置一个时间间隔， 在这个时间间隔内， 用户只能触发一次搜索。
同样在区块链中， 也有类似的场景： 例如， 在空投中， 我们不希望用户频繁领取空投， 因此， 我们可以设置一个时间间隔在这个时间间隔内， 用户只能领取一次空投。


## Project Design

### Throttle Overview


### Implementation




## Value to the Artela Ecosystem
The Throttle Aspect brings several valuable features to the Artela Ecosystem:

**Enhanced Security:**
通过限流功能， 可以防止 DDoS 攻击， 保护网络安全。
对于空投等场景， 可以限制用户频繁领取空投， 保护项目方的利益。

## 与纯EVM实现的对比

EVM生态中可以在合约中实现限流功能， 但如果合约尚未考虑限流逻辑的话， 升级合约相对麻烦， 通过 Aspect 可以在不修改合约的情况下， 为合约增加限流功能。

## TODO & Future Plans

1. 由于目前 Artela 的 FilterTx 切面尚未实装。 若能实现FilterTx切面， 则可以在交易进入 Mempool 之前就拒绝超限的交易， 以减轻网络压力， 防止 DDoS
2. 本 Aspect 演示在部署时便已经通过`property`指定了方法签名和相关限流配置, 但是在实际应用中， 我们希望：
  1. 本 Aspect 可以作为公共组件， 为不同的合约提供能力
  2. 链上运行时动态修改限流配置
  以上可以通过 `operation` 接口进行实现


## How to Use

