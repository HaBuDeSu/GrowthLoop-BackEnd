
exports.up = function(knex) {
    return knex.schema
        .createTable('organizations', tbl => {
            tbl.increments();
            tbl.string('name').notNullable();
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .createTable('users', tbl => {
            tbl.increments();
            tbl.integer('organization_id').unsigned();
            tbl.foreign('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
            tbl.string('email').notNullable();
            tbl.string('password').notNullable();
            tbl.string('first_name').notNullable();
            tbl.string('last_name').notNullable();
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .createTable('events', tbl => {
            tbl.increments();
            tbl.string('name');
            tbl.float('value');
            tbl.integer('next').unsigned();
            tbl.foreign('next').references('id').inTable('events').onDelete('CASCADE');
            tbl.integer('previous').unsigned();
            tbl.foreign('previous').references('id').inTable('events').onDelete('CASCADE');
        })
        .createTable('funnels', tbl => {
            tbl.increments();
            tbl.string('name');
            tbl.integer('organization_id').unsigned();
            tbl.foreign('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
            tbl.integer('head_event').unsigned();
            tbl.foreign('head_event').references('id').inTable('events').onDelete('CASCADE');
            tbl.integer('tail_event').unsigned();
            tbl.foreign('tail_event').references('id').inTable('events').onDelete('CASCADE');
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .createTable('experiments', tbl => {
            tbl.increments();
            tbl.string('name');
            tbl.string('description');
            tbl.string('status');
            tbl.integer('event_id').unsigned();
            tbl.integer('owner').unsigned();
            tbl.foreign('owner').references('id').inTable('users').onDelete('CASCADE');
            tbl.integer('created_by').unsigned();
            tbl.foreign('created_by').references('id').inTable('users').onDelete('CASCADE');
            tbl.decimal('trials');
            tbl.decimal('successes');
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('experiments')
        .dropTableIfExists('funnels')
        .dropTableIfExists('events')
        .dropTableIfExists('users')
        .dropTableIfExists('organizations')
};
