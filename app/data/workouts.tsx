import { Workout } from "~/domain/workout";

export async function getWorkouts(): Promise<Workout[]> {
  const workouts: Workout[] = [
    {
      id: "1",
      name: "6 * 6 minutes intervals",
      type: "threshold",
      description: "Engage in six intervals, each lasting six minutes, with a focus on maintaining approximately 90% of your maximum heart rate throughout each bout. This intensive workout is designed to improve your anaerobic threshold and boost your cardiovascular endurance. Be mindful to prioritize maintaining a consistent intensity throughout each interval and ensure ample recovery time between each session to facilitate optimal performance and muscular recovery.",
      date: "2022-01-01",
    },
    {
      id: "2",
      name: "5 * 5 minutes intervals",
      type: "threshold",
      description: "Involve yourself in five intervals of intense work for five minutes each, sustaining around 90% of your maximum heart rate. This workout targets your lactate threshold, striving to enhance your ability to sustain higher intensities for extended durations. Careful monitoring of your heart rate and exertion levels will be pivotal in ensuring that the workout elicits the desired training effect without promoting undue fatigue or strain.",
      date: "2022-01-03",
    },
    {
      id: "3",
      name: "30 * 45/15 intervals",
      type: "interval",
      description: "Execute a demanding interval workout consisting of 30 sets, where each set is composed of 45 seconds of robust, high-intensity work followed by a 15-second recovery period. This form of high-intensity interval training (HIIT) sharpens your aerobic and anaerobic systems, significantly enhancing your ability to recover swiftly after bursts of intense physical exertion.",
      date: "2022-01-05",
    },
    {
      id: "4",
      name: "Long run",
      type: "endurance",
      description: "Engage in a prolonged run lasting 90 minutes, with an emphasis on maintaining a comfortable, sustainable pace throughout. This endurance-building workout aims to bolster your aerobic fitness, augmenting your body’s efficiency in utilizing oxygen and promoting enhanced stamina and resilience in prolonged physical activities.",
      date: "2022-01-07",
    },
    {
      id: "5",
      name: "Hill repeats",
      type: "strength",
      description: "Execute a series of hill repeats, entailing a powerful one-minute uphill run followed by a gentle jog back down, repeating this sequence 10 times. This workout is crucial for building leg strength and enhancing your muscular endurance, concurrently offering benefits for both aerobic and anaerobic fitness due to the challenging nature of uphill running.",
      date: "2022-01-09",
    },
    {
      id: "6",
      name: "Fartlek",
      type: "speed",
      description: "Immerse yourself in a 45-minute Fartlek session, where you'll oscillate between periods of higher speed and slower, recovery paces. This Swedish term, meaning speed play,encourages variability in your run, focusing on improving your speed, endurance, and running economy by engaging different energy systems dynamically.",
      date: "2022-01-11",
    },
    {
      id: "7",
      name: "Pyramid intervals",
      type: "interval",
      description: "Engage in pyramid-style intervals, encompassing bouts of 30s, 45s, 60s, 90s, 60s, 45s, and 30s of high-intensity work, each followed by an equivalent duration of rest. This workout enhances your muscular power and aerobic capacity by varying the work intervals and allowing adequate recovery between bouts to maintain the intensity of each subsequent interval.",
      date: "2022-01-13",
    },
    {
      id: "8",
      name: "Tempo run",
      type: "threshold",
      description: "Engage in a 60-minute tempo run, maintaining a steady pace that hovers just below your lactate threshold. This workout focuses on improving your metabolic fitness, enhancing your body’s ability to clear lactate, a byproduct of anaerobic metabolism, and effectively delaying the onset of fatigue during sustained physical efforts.",
      date: "2022-01-15",
    },
    {
      id: "9",
      name: "Hill sprints",
      type: "strength",
      description: "Perform a series of explosive hill sprints, each lasting 10 seconds, followed by a gentle jog back to the starting position, with the cycle repeated 10 times. This potent workout primarily targets your fast-twitch muscle fibers, enhancing your power, strength, and sprinting capabilities by offering a challenging and elevation-based resistance to your running.",
      date: "2022-01-17",
    },
    {
      id: "10",
      name: "Easy run",
      type: "recovery",
      description: "Embark on a 30-minute run at an exceptionally easy, conversational pace, designed to facilitate recovery post more strenuous workouts. This low-intensity, recovery-focused workout aids in promoting blood flow to the muscles, fostering recovery, and maintenance of your aerobic fitness without imposing additional stress on the body.",
      date: "2022-01-19",
    },
  ];

  return workouts;
}

//Define a function that returns one workout based on the id

export async function getWorkout(id: string): Promise<Workout | undefined> {
  const workouts = await getWorkouts();
  const workout = workouts.find((workout) => workout.id === id);
  return workout;
}