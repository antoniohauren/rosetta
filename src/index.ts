import { RosettaRepository } from "./repository/rosetta-repository";
import { FileService } from "./service/file-service";
import { RosettaService } from "./service/rosetta-service";

const repository = new RosettaRepository();
const fileService = new FileService();
const service = new RosettaService(repository, fileService);

(async () => {
  // await service.addAllRosettasFromFile();
  // console.log(await service.getMissingRosettasByLang("pt_PT"));

  // await service.updateRosetta("NOVO", "chave", { pt_PT: "valor safadinho" })
  // console.log(await service.getMissingRosettasByLang("pt_PT"));

  await service.writeFileByLang("pt_PT");

  repository.done();
})();
