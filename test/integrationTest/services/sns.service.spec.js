const { configureContainer, stopContainer } = require('../bootstrap/aws.service.config');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100_000;

describe('SNS service tests', () => {
    beforeAll(async () => await configureContainer('sns'));
    afterAll(async () => await stopContainer());

    it('Publish to unexist SNS topic', async () => {
        const topicName = 'my-test-topic';
        const message = { message: 'test' }

        const { publishMessage } = require('../../../src/services/sns.service');

        const result = await publishMessage(topicName, message);

        expect(result).toBeUndefined();
    });

    it('Publish to exist SNS topic', async () => {
        const topicName = 'my-test-topic';
        const message = { message: 'test' }

        const { createSnsTopic } = require('../../../src/infrastructure/sns.infra');
        const { publishMessage } = require('../../../src/services/sns.service');

        await createSnsTopic(topicName);
        const result = await publishMessage(topicName, message);

        expect(result).not.toBeUndefined();
    });

    // it('Publish to SNS topic and consume the message', async () => {
    //     const topicName = 'my-test-topic';
    //     const message = { message: 'test' }

    //     const { createSnsTopic } = require('../../../src/infrastructure/sns.infra');
    //     const { publishMessage } = require('../../../src/services/sns.service');

    //     await createSnsTopic(topicName);
    //     const result = await publishMessage(topicName, message);

    //     expect(result).not.toBeUndefined();
    // });
})