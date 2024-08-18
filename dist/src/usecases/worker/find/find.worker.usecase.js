"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindWorker = void 0;
class FindWorker {
    constructor(workerRepository) {
        this.workerRepository = workerRepository;
    }
    async execute(dto) {
        let worker = await this.workerRepository.find(dto.id);
        let output = {};
        if (worker) {
            output = {
                birthday: worker.birthday,
                name: worker.name,
                createdAt: worker.createdAt,
                id: worker.id,
                role: worker.role,
                udpatedAt: worker.updatedAt
            };
        }
        return output;
    }
}
exports.FindWorker = FindWorker;
//# sourceMappingURL=find.worker.usecase.js.map