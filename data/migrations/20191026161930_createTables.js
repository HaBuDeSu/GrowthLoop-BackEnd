
exports.up = function(knex) {
    return knex.schema
        .createTable("accounts", tbl => {
            tbl.increments();
            tbl.string("name").notNullable();
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
            tbl.string('name');
        })
        .createTable("account_funnels", tbl => {
            tbl.increments();
            tbl.integer('funnel_id').unsigned();
            tbl.foreign('funnel_id').references('id').inTable('funnels').onDelete("CASCADE");
            tbl.integer('account_id').unsigned();
            tbl.foreign('account_id').references('id').inTable('accounts').onDelete("CASCADE");
            tbl.integer('owner');
            tbl.foreign('owner').references('id').inTable('users').onDelete("CASCADE");
            tbl.string('name');
        })
        .createTable("steps", tbl => {
            tbl.increments();
            tbl.integer("funnel_id").unsigned();
            tbl.foreign("funnel_id").references("id").inTable("funnels").onDelete("CASCADE");
            tbl.string("name");
        })
        .createTable("conversions", tbl => {
            tbl.increments();
            tbl.integer("step_id").unsigned();
            tbl.foreign("step_id").references("id").inTable("steps").onDelete("CASCADE");
            tbl.string("name");
        })
        .createTable("experiments", tbl => {
            tbl.increments();
            tbl.integer("step_id").unsigned();
            tbl.integer("owner").unsigned();
            tbl.foreign('owner').references('id').inTable('users').onDelete("CASCADE");
            tbl.string("goal_type").notNullable();
            tbl.decimal("goal_value").notNullable();
            tbl.decimal("trials");
            tbl.decimal("successes");
        })
};

exports.down = function(knex) {
  
};
