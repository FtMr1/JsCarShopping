
const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url")
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");
// UI ready


const ui = new UI();


const storage = new Storage();

eventListeners();

function eventListeners(){
    form.addEventListener("submit"  , addCar);
    document.addEventListener("DOMContentLoaded" , function(){
        let cars = storage.getCarsFormStorage();
        ui.loadAllCars(cars);
    });
   cardbody.addEventListener("click" , deleteCar);
   clear.addEventListener("click" , clearAllCars);
}

function addCar (e){
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;
    e.preventDefault()

    if(
        title ===" " || price=== "" || url === ""
    ){
            ui.displayMessages("Tüm alanları doldurun..." , "danger")
    }
    else{
        const newCar = new Car(title , price , url);
        ui.addCarToUI(newCar); //Arayüze araç ekleme
        storage.addCarToStorage(newCar)

        ui.displayMessages("Araç başarıyla eklendi..." , "success")
    }
    ui.clearInputs(titleElement , urlElement , priceElement)
}

function deleteCar(e){
    if(e.target.id === "delete-car"){
        ui.deleteCarFormUI(e.target)

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarıyla gerçekleşti..." , "success")
        
    }
}

function clearAllCars(){
   

    if(confirm("Tüm araçlar silinecek.Emin misin?")){
        ui.clearAllCarsFromUI();
        storage.deleteCarFromStorage();
    }
}