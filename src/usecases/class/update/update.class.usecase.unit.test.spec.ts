import { UpdateClassDto } from './udpate.class.dto';


describe('update class usecase unit test', () =>{

    it('should not update any class if id does not exist', async () =>{
        let nonExistentId = '123';
        let wantedBookName = 'bookb1';
        let wantedClassName = 'b1';
        let input : UpdateClassDto = new UpdateClassDto(nonExistentId, wantedBookName, wantedClassName);
        // TODO DO THE REST OF THE CODE
    })

})