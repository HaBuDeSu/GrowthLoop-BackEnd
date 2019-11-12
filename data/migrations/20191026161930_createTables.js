
exports.up = function(knex) {
    return knex.schema
        .createTable("accounts", tbl => {
            tbl.increments();
            tbl.string("account_name").notNullable();
        })
        .createTable("users", tbl => {
            tbl.increments();
            tbl.integer('account_id').unsigned();
            tbl.foreign('account_id').references('id').inTable('accounts').onDelete("CASCADE");
            tbl.string('email').notNullable();
            tbl.string('password').notNullable();
        })
        .createTable("funnels", tbl => {
            tbl.increments();
            tbl.integer('account_id').unsigned();
            tbl.foreign('account_id').references('id').inTable('accounts').onDelete("CASCADE");
            tbl.integer('owner');
            tbl.foreign('owner').references('id').inTable('users').onDelete("CASCADE");
            tbl.string('funnel_name');
        })
        .createTable("steps", tbl => {
            tbl.increments();
            tbl.integer("funnel_id").unsigned();
            tbl.foreign("funnel_id").references("id").inTable("funnels").onDelete("CASCADE");
            tbl.string("step_name");

        })
        .createTable("conversions", tbl => {
            tbl.increments();
        })
        .createTable("experiments", tbl => {
            tbl.increments();
            tbl.integer('')
        })
};

exports.down = function(knex) {
  
};
