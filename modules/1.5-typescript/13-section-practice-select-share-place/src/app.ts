import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
type GoogleGeoCodingResponse = { 
    results: { geometry: { location: { lat: number; lng: number } } }[] ;
    status: "OK" | "ZERO_RESULTS";
}

const GOOGLE_API_KEY = 'AIzaSyBoHhi3PPt_rNX4UfFoUSZ8LZq6Uy_B3Vc';

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const address = addressInput.value;
    axios.get<GoogleGeoCodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`)
        .then((response) => {
            
            if (response.data.status != 'OK') {
                throw Error(`That address doesn't exist`);
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: coordinates,
                zoom: 12,
              });
            new google.maps.Marker({position:coordinates,map:map});
        })

        .catch((err) => {
            alert(err);
            console.log(err)
        })

}

form.addEventListener('submit', searchAddressHandler);
