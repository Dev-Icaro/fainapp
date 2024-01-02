/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(
    ` CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      mail VARCHAR(50) NOT NULL,
      password VARCHAR(200) NOT NULL,
      name VARCHAR(50) NOT NULL,
      verification_date TIMESTAMP,
      creation_date TIMESTAMP,
      update_date TIMESTAMP
    )`,
  );
};

exports.down = pgm => {
  pgm.sql('DROP TABLE users');
};
