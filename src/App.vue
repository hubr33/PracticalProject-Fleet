<template>
  <div id="app">
    <div class="title"><h2>Dodawanie auta do floty aut</h2></div>
    <main class="fleet">
      <form @submit.prevent="addNewCar">
        <label for="brand">Marka samochodu</label>
        <input
          type="text"
          placeholder="Wpisz nazwę samochodu"
          v-model="carBrand"
        />
        <label for="power">Moc</label>
        <input type="text" placeholder="Wpisz moc w KM" v-model="carPower" />
        <label for="engine">Silnik</label>
        <input
          type="text"
          placeholder="Wpisz typ silnika oraz pojemność w litrach"
          v-model="carEngine"
        />
        <label for="shift">Skrzynia biegów</label>
        <select name="shift" id="shift" v-model="carGearShift">
          <option value="" disabled selected
            >-- Wybierz rodzaj skrzyni --</option
          >
          <option value="Automatyczna">Automatyczna</option>
          <option value="Manualna">Manualna</option>
          <option value="Pół-automatyczna">Pół-automatyczna</option>
        </select>
        <label for="acceleration">Przyspieszenie</label>
        <input
          type="text"
          placeholder="Wpisz przyspieszenie auta do 100km/h w sekundach"
          v-model="carAcceleration"
        />
        <label for="consumption">Spalanie</label>
        <input
          type="text"
          placeholder="Wpisz spalanie auta w litrach na 100km w mieście i trasie np. 20/10"
          v-model="carConsumption"
        />
        <label for="seats">Ilość miejsc</label>
        <input
          type="text"
          placeholder="Wpisz ilość miejsc siedzacych w aucie"
          v-model="carSeats"
        />
        <label for="productionYear">Rok produkcji</label>
        <input
          type="number"
          placeholder="Wpisz rok produkcji auta"
          v-model="carProduction"
        />
        <label for="drive">Napęd auta</label>
        <select name="drive" id="drive" v-model="carDrive">
          <option value="" selected disabled>-- Wybierz napęd auta --</option>
          <option value="Tył">Tył</option>
          <option value="Przód">Przód</option>
          <option value="AWD">AWD</option>
        </select>
        <label for="img">Dodaj link do zdjęcia auta (400px x 300px)</label>
        <input
          type="text"
          placeholder="Wklej link do zdjęcia auta"
          v-model="carImg"
        />
        <label for="price1to5"
          >Cena auta 1-5 dni (Podaj cenę za 1 dzień wypożyczenia)</label
        >
        <input type="text" placeholder="Wpisz cenę" v-model="price1to5" />
        <label for="price6o13"
          >Cena auta 6-13 dni (Podaj cenę za 1 dzień wypożyczenia)</label
        >
        <input type="text" placeholder="Wpisz cenę" v-model="price6to13" />
        <label for="price14plus"
          >Cena auta 14+ dni (Podaj cenę za 1 dzień wypożyczenia)</label
        >
        <input type="text" placeholder="Wpisz cenę" v-model="price14plus" />
        <label for="carDeposit">Podaj cenę kaucji auta</label>
        <input type="text" placeholder="Wpisz cenę kaucji" v-model="deposit" />
        <label for="description">Opis auta</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Wpisz opis auta max. 150 znaków"
          v-model="carDescription"
          maxlength="150"
        ></textarea>
        <button class="addNewCar">Dodaj nowe auto</button>
      </form>
    </main>
    <section>
      <h2>Aktualny podgląd</h2>
      <h3 v-if="carList.length === 0">
        Nie ma aktualnie dodanych aut do poglądu
      </h3>
      <div class="oneCar" v-for="(car, index) in carList" :key="index">
        <div class="imgSection">
          <img :src="car.carImg" alt="" />
        </div>
        <div class="carInfo">
          <h1>{{ car.carBrand }}</h1>
          <div class="shortInfo">
            <aside>
              <p>
                Moc: <span>{{ car.carPower }} KM</span>
              </p>
              <p>
                Silnik: <span>{{ car.carEngine }}</span>
              </p>
              <p>
                Skrzynia: <span>{{ car.carGearShift }}</span>
              </p>
              <p>
                Przyspieszenie: <span>{{ car.carAcceleration }}s</span>
              </p>
            </aside>
            <aside>
              <p>
                Spalanie: <span>{{ car.carConsumption }}l</span>
              </p>
              <p>
                Liczba siedzeń: <span>{{ car.carSeats }}</span>
              </p>
              <p>
                Rok produkcji: <span>{{ car.carProduction }}</span>
              </p>
              <p>
                Napęd: <span>{{ car.carDrive }}</span>
              </p>
            </aside>
          </div>
          <div class="longInfo">
            {{ car.carDescription }}
          </div>
        </div>
        <div class="carRentCost">
          <h1>Koszty wynajmu auta</h1>
          <div class="priceDueTime">
            <div>
              <p>1-5 dni</p>
              <span class="oneToFive">{{ car.price1to5 }}zł / dzień</span>
            </div>
            <div>
              <p>6-13 dni</p>
              <span class="sixToThirteen">{{ car.price6to13 }}zł / dzień</span>
            </div>
            <div>
              <p>14+ dni</p>
              <span class="FourteenPlus">{{ car.price14plus }}zł / dzień</span>
            </div>
          </div>
          <p class="deposit">
            Kaucja <span class="depositPrice">{{ car.deposit }}</span
            >zł
          </p>
          <div class="extraOptions">
            <button class="deleteCar" @click="deleteCar(index)">Usuń</button>
          </div>
        </div>
      </div>
      <button
        v-if="this.carList.length >= 1"
        class="sendToReviewTeam"
        @click="saveData"
      >
        Wyślij zgłoszenie o dodaniu auta
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carBrand: "",
      carPower: "",
      carEngine: "",
      carGearShift: "",
      carAcceleration: "",
      carConsumption: "",
      carSeats: "",
      carProduction: "",
      carDrive: "",
      carImg: "",
      carDescription: "",
      price1to5: "",
      price6to13: "",
      price14plus: "",
      deposit: "",
      carList: [],
    };
  },
  methods: {
    saveData() {
      let newCar = {
        caseType: "fleet",
        carBrand: this.carList[0].carBrand,
        carPower: this.carList[0].carPower,
        carEngine: this.carList[0].carEngine,
        carGearShift: this.carList[0].carGearShift,
        carAcceleration: this.carList[0].carAcceleration,
        carConsumption: this.carList[0].carConsumption,
        carSeats: this.carList[0].carSeats,
        carProduction: this.carList[0].carProduction,
        carDrive: this.carList[0].carDrive,
        carImg: this.carList[0].carImg,
        carDescription: this.carList[0].carDescription,
        price1to5: this.carList[0].price1to5,
        price6to13: this.carList[0].price6to13,
        price14plus: this.carList[0].price14plus,
        deposit: this.carList[0].deposit,
      };
      this.coachViewContext.binding.set("value", newCar);
      this.coachViewContext.trigger();
      console.log(newCar);
    },
    deleteCar(id) {
      this.carList.splice(id, 1);
    },
    addNewCar() {
      const allInputs = document.querySelectorAll(".fleet input");
      const selects = document.querySelectorAll(".fleet select");
      const textArea = document.querySelector(".fleet textarea");
      if (
        this.carBrand !== "" &&
        this.carPower !== "" &&
        this.carEngine !== "" &&
        this.carGearShift !== "" &&
        this.carAcceleration !== "" &&
        this.carSeats !== "" &&
        this.carProduction !== "" &&
        this.carDrive !== "" &&
        this.carImg !== "" &&
        this.carDescription !== "" &&
        this.price1to5 !== "" &&
        this.price6to13 !== "" &&
        this.price14plus !== "" &&
        this.deposit !== "" &&
        this.carBrand !== ""
      ) {
        this.carList.push({
          carBrand: this.carBrand,
          carPower: this.carPower,
          carEngine: this.carEngine,
          carGearShift: this.carGearShift,
          carAcceleration: this.carAcceleration,
          carConsumption: this.carConsumption,
          carSeats: this.carSeats,
          carProduction: this.carProduction,
          carDrive: this.carDrive,
          carImg: this.carImg,
          carDescription: this.carDescription,
          price1to5: this.price1to5,
          price6to13: this.price6to13,
          price14plus: this.price14plus,
          deposit: this.deposit,
        });
        (this.carBrand = ""),
          (this.carPower = ""),
          (this.carEngine = ""),
          (this.carGearShift = ""),
          (this.carAcceleration = ""),
          (this.carConsumption = ""),
          (this.carSeats = ""),
          (this.carProduction = ""),
          (this.carDrive = ""),
          (this.carImg = ""),
          (this.carDescription = "");
        (this.price1to5 = ""),
          (this.price6to13 = ""),
          (this.price14plus = ""),
          (this.deposit = "");
        textArea.classList.remove("active");
        selects.forEach((select) => select.classList.remove("active"));
        allInputs.forEach((input) => input.classList.remove("active"));
      } else {
        selects.forEach((select) => {
          if (select.value === "") {
            select.classList.add("active");
          } else {
            select.classList.remove("active");
          }
        });
        allInputs.forEach((input) => {
          if (input.value.length < 2) {
            input.classList.add("active");
          } else {
            input.classList.remove("active");
          }
        });
        if (textArea.value.length < 10) {
          textArea.classList.add("active");
        } else {
          textArea.classList.remove("active");
        }
      }
    },
  },
};
</script>

<style scoped>
@import "./styles/style.css";
</style>
