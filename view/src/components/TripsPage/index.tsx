import type { FunctionComponent } from "react";
import Collapsible from "../Collapsible";

const TripsPage: FunctionComponent = () => {
  return (
    <div className="slight-margin">
      <Collapsible title="Frankfurt" thumbnailSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Skyline_Frankfurt_am_Main_2015.jpg/1200px-Skyline_Frankfurt_am_Main_2015.jpg">
        <h2>Frankfurt</h2>
        <p>Frankfurt was a city state, the Free City of Frankfurt, for nearly five centuries, and was one of the most important cities of the Holy Roman Empire, as a site of Imperial coronations; it lost its sovereignty upon the collapse of the empire in 1806, regained it in 1815 and then lost it again in 1866, when it was annexed (though neutral) by the Kingdom of Prussia. It has been part of the state of Hesse since 1945. Frankfurt is culturally, ethnically and religiously diverse, with half of its population, and a majority of its young people, having a migrant background. A quarter of the population consists of foreign nationals, including many expatriates. In 2015, Frankfurt was home to 1,909 ultra high-net-worth individuals, the sixth-highest number of any city. As of 2023, Frankfurt is the 13th-wealthiest city in the world and the third-wealthiest city in Europe (after London and Paris).</p>
        <a href="https://en.wikipedia.org/wiki/Frankfurt">Wikipedia</a>
      </Collapsible>

      <Collapsible title="Tokyo" thumbnailSrc="https://www.japan-guide.com/thumb/destination_tokyo.jpg">
        <h2>Tokyo</h2>
        <p>Tokyo (東京, Tōkyō) is Japan's capital and the world's most populous metropolis. It is also one of Japan's 47 prefectures, consisting of 23 central city wards and multiple cities, towns and villages west of the city center. The Izu and Ogasawara Islands are also part of Tokyo.

          Prior to 1868, Tokyo was known as Edo. Previously a small castle town, Edo became Japan's political center in 1603 when Tokugawa Ieyasu established his feudal government there. A few decades later, Edo had grown into one of the world's largest cities. With the Meiji Restoration of 1868, the emperor and capital moved from Kyoto to Edo, which was renamed Tokyo ("Eastern Capital"). Large parts of Tokyo were destroyed in the Great Kanto Earthquake of 1923 and the air raids of 1945.</p>
        <a href="https://www.japan-guide.com/e/e2164.html">Japan Guide</a>
      </Collapsible>

      <Collapsible title="Transylvania" thumbnailSrc="https://chasingthedonkey.b-cdn.net/wp-content/uploads/2018/04/Draculas-castle_Transylvania_shutterstock_153673181.jpg">
        <h2>Transylvania</h2>
        <p>Transylvania is home to some of Europe's best-preserved medieval towns and outstanding rural landscapes. Brasov - home to the largest Gothic church in Eastern Europe, Sibiu - with its cobblestone streets and Transylvanian Baroque architecture, and Sighisoara hilltop citadel with secret passageways and a 14th century clock tower are some of Transylvania most popular destinations. Tiny shops that offer antiques and handicrafts made by local artisans line the narrow streets flanked by pastel-colored houses of the historic sections of many other towns in Transylvania.</p>
        <a href="https://romaniatourism.com/transylvania.html">Romania Tourism</a>
      </Collapsible>

      <Collapsible title="Grand Canyon" thumbnailSrc="https://upload.wikimedia.org/wikipedia/commons/a/aa/Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg">
        <h2>Grand Canyon</h2>
        <p>The Grand Canyon is a river valley in the Colorado Plateau that exposes uplifted Proterozoic and Paleozoic strata, and it is also one of the six distinct physiographic sections of the Colorado Plateau province. Even though it is not the deepest canyon on land in the world (Kali Gandaki Gorge in Nepal is much deeper), the Grand Canyon is known for its visually overwhelming size and its intricate and colorful landscape. Geologically, it is significant because of the thick sequence of ancient rocks that are well preserved and exposed in the walls of the canyon. These rock layers record much of the early geologic history of the North American continent.</p>
        <a href="https://en.wikipedia.org/wiki/Grand_Canyon">Wikipedia</a>
      </Collapsible>
    </div>
  );
};

export default TripsPage;