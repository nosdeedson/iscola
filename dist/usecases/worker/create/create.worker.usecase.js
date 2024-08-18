"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("../../../domain/worker/worker");
class CreateWorkerUseCase {
    constructor(workerRepository) {
        this.workerRepository = workerRepository;
    }
    async execute(dto) {
        let worker = new worker_1.Worker(dto.birthday, dto.name, dto.role);
        if (worker.notification?.hasError()) {
            throw new Error(worker.notification.messages());
        }
        try {
            this.workerRepository.create(worker);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = CreateWorkerUseCase;
//# sourceMappingURL=create.worker.usecase.js.map