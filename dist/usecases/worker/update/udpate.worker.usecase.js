"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUseCaseWorker = void 0;
class UpdateUseCaseWorker {
    constructor(workerRepository) {
        this.workerRepository = workerRepository;
    }
    async execute(dto) {
        let worker = await this.workerRepository.find(dto.id);
        worker = this.update(worker, dto);
        if (worker.notification?.hasError()) {
            throw new Error(worker.notification.messages());
        }
        this.workerRepository.update(worker);
    }
    update(worker, dto) {
        worker.name = dto.name;
        worker.role = dto.role;
        worker.validate();
        return worker;
    }
}
exports.UpdateUseCaseWorker = UpdateUseCaseWorker;
//# sourceMappingURL=udpate.worker.usecase.js.map