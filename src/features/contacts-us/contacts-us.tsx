import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Col } from "shared/ui";

import styles from "./styles.module.scss";

export const ContactUs = () => {
  return (
    <Col className={styles.contact}>
      <Gap size="l" />
      <Typography.Title tag="h1">Контакты</Typography.Title>
      <Gap size="s" />
      <Typography.Text>+7 999 000 00 00</Typography.Text>
      <Typography.Text>info@alfabankstore.ru</Typography.Text>
      <Gap size="l" />
      <Typography.Text>г. Москва, пр-т Андропова, 18 корп. 3</Typography.Text>
      <Gap size="4xl" />
      <YMaps>
        <div className={styles.map} data-test-id="map">
          <Map
            className={styles.map__content}
            defaultState={{
              center: [55.694459, 37.661994],
              zoom: 13,
            }}
            modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
          >
            <Placemark
              defaultGeometry={[55.694459, 37.661994]}
              options={{
                preset: "islands#oliveStretchyIcon",
                iconColor: "red",
              }}
              properties={{
                iconContent: "A-store",
                hintContent: "<em>кликни меня</em>",
                balloonContent: `<div class="my-balloon">
                  <h4>Alfa-bank</h4>
                  <p>Забирай свой мерч отсюда:</p>
                  <p>
                    г. Москва,
                    <br />
                    пр-т Андропова, 18 корп. 3
                  </p>
                </div>`,
              }}
            />
          </Map>
        </div>
      </YMaps>
    </Col>
  );
};
