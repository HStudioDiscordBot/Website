export type Shard = {
    online: boolean;
};

export interface BotShardsProps {
    lang: string;
    error: boolean;
    shards: Shard[];
}