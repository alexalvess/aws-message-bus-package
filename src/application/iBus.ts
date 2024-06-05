import {
    ConsumerParams,
    RedeliveryInput
} from "../aws-provider/utils/types";

import { 
    GenericMessage, 
    ScheduleInput 
} from "./utils/types";

export interface IBus {
    publish<TMessage extends GenericMessage>(topicName: string, message: TMessage): Promise<void>;
    send<TMessage extends GenericMessage>(queueName: string, message: TMessage, params?: {}): Promise<void>;
    redelivery<TMessage extends GenericMessage>(params: RedeliveryInput<TMessage>): Promise<void>;
    schedule<TMessage extends GenericMessage>(params: ScheduleInput<TMessage>): Promise<void>;
    consume<TMessage extends GenericMessage>(params: ConsumerParams<TMessage>): void;
}