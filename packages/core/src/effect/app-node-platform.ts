import { LLMClient, RequestExecutor } from "@opencode/ai/route"
import { Socket } from "effect/socket"
import { makeGlobalNode } from "@opencode/util/effect/app-node"
import { httpClient } from "@opencode/util/effect/app-node-platform"
import { Layer } from "effect"
import { UndiciFetch } from "../util/undici-fetch.js"
import { WebSocketConstructor } from "./websocket-constructor.js"

export const requestExecutor = makeGlobalNode({
  service: RequestExecutor.Service,
  // Provider requests get their own client: Node's fetch would cut slow responses at undici's 300s defaults.
  layer: RequestExecutor.layer.pipe(Layer.provide(UndiciFetch.layer())),
  deps: [httpClient],
})

export const llmClient = makeGlobalNode({ service: LLMClient.Service, layer: LLMClient.layer, deps: [requestExecutor] })

export const webSocketConstructor = makeGlobalNode({
  service: Socket.WebSocketConstructor,
  layer: WebSocketConstructor.layer,
  deps: [],
})

export * as LayerNodePlatform from "./app-node-platform.js"
