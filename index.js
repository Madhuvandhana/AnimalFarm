const animals = require("./data/animals");
//const animals = data.animals;

async function main() {
    let id;
    let createdAnimal1;
    try {
        const createdAnimal = await animals.create("Sasha", "Dog");
        console.log("Logging newly created Sasha");
        console.log(createdAnimal);
        id = createdAnimal._id;
        }
        catch (error) {
            console.error(error);
         }
         try {
            createdAnimal1 = await animals.create("Lucy", "Dog");
            //console.log(createdAnimal1);
          
            }
            catch (error) {
                console.error(error);
             }
             try{
                const allAnimals = await animals.getAll();
                console.log("Querying all animals, and logging them all after creating Lucy");
                console.log(allAnimals);
               }catch (error) {
                console.error(error);
            }

            try {
                const createdAnimal = await animals.create("Duke", "Walrus");
                console.log("Logging newly created Duke");
                console.log(createdAnimal);
                }
                catch (error) {
                    console.error(error);
                 }
                   
        try{
            const updatedAnimal = await animals.rename(id, "Sashita"); 
            console.log("rename Sasha to Sashita");
        console.log(updatedAnimal);
        } catch (error) {
            console.error(error);
        }
    try {    
    var remove_id = createdAnimal1._id;
    const removeAnimal = await animals.remove(remove_id);
    console.log("Removed Lucy");
    console.log(removeAnimal);
    }catch (error) {
        console.error(error);
     }
    
     try{
        const allAnimals1 = await animals.getAll();
        console.log("Querying all animals, and logging them all");
        console.log(allAnimals1);
       }catch (error) {
        console.error(error);
    }
   
}

main().catch(console.log);