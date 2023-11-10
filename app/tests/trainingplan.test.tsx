import { Workout } from "../calculations/plan";

test('Create training plan', () => {

    
    
    let workout3 = new Workout('Evening Walk', {}, 1, 1, 0.5);

    console.log("name", workout3.name)
    console.log("name", workout3.cooldownKm)
    console.log("name", workout3.warmupMiles)




});
