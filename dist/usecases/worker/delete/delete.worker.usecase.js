"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWorkerUsecase = void 0;
class DeleteWorkerUsecase {
    constructor(workerRepository) {
        this.workerRepository = workerRepository;
    }
    async execute(id) {
        let worker = await this.workerRepository.find(id);
        if (worker) {
            this.workerRepository.delete(id);
        }
    }
}
exports.DeleteWorkerUsecase = DeleteWorkerUsecase;
//# sourceMappingURL=delete.worker.usecase.js.map