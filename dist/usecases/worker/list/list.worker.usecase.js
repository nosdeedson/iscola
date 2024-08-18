"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllWorker = void 0;
class FindAllWorker {
    constructor(workerRepository) {
        this.workerRepository = workerRepository;
    }
    async execute() {
        let workers = await this.workerRepository.findAll();
        let results = {
            all: workers.map(it => {
                let output = {
                    birthday: it.getBirthDay(),
                    createdAt: it.getCreatedAt(),
                    id: it.getId(),
                    name: it.getName(),
                    role: it.getRole(),
                    udpatedAt: it.getUpdatedAt()
                };
                return output;
            })
        };
        return results;
    }
}
exports.FindAllWorker = FindAllWorker;
//# sourceMappingURL=list.worker.usecase.js.map