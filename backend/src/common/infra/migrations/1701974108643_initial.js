/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(
    ` CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      mail VARCHAR(50),
      password VARCHAR(50),
      name VARCHAR(50),
      creation_date TIMESTAMP,
      update_date TIMESTAMP
    )`,
  );
};

exports.down = pgm => {
  pgm.sql('DROP TABLE users');
};
