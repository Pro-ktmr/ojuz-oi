const BACKEND_URL = 'https://ojuz-oi-backend.fly.dev';
const url = new URL(window.location.href);
const params = url.searchParams;

function parseBoolean(str) {
    return str == 'true';
}

const my_handle = params.has('my_handle') ? params.get('my_handle') : '';
const rivals_handle = params.has('rivals_handle') ? params.get('rivals_handle').replaceAll(' ', '').split(',').filter(Boolean) : [];
const year_begin = params.has('year_begin') ? parseInt(params.get('year_begin')) : 0;
const year_end = params.has('year_end') ? parseInt(params.get('year_end')) : 9999;
const joi_sp = params.has('joi_sp') ? parseBoolean(params.get('joi_sp')) : true;
const joi_op = params.has('joi_op') ? parseBoolean(params.get('joi_op')) : true;
const apio = params.has('apio') ? parseBoolean(params.get('apio')) : true;
const ioi = params.has('ioi') ? parseBoolean(params.get('ioi')) : true;
const batch = params.has('batch') ? parseBoolean(params.get('batch')) : true;
const interactive = params.has('interactive') ? parseBoolean(params.get('interactive')) : true;
const communication = params.has('communication') ? parseBoolean(params.get('communication')) : true;
const output_only = params.has('output_only') ? parseBoolean(params.get('output_only')) : true;
const show_unavailable = params.has('show_unavailable') ? parseBoolean(params.get('show_unavailable')) : false;
const show_ac = params.has('show_ac') ? parseBoolean(params.get('show_ac')) : true;
const sort_key = params.has('sort_key') ? params.get('sort_key') : 'difficulty';

function getYears() {
    let first_year = 9999;
    let last_year = 0;
    for (const task of tasks) {
        first_year = Math.min(first_year, task.year);
        last_year = Math.max(last_year, task.year);
    }
    let years = [];
    for (let year = first_year; year <= last_year; year++) {
        years.push({ text: String(year), value: year });
    }
    return years;
}

let app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        my_handle: params.has('my_handle') ? params.get('my_handle') : '',
        rivals_handle: params.has('rivals_handle') ? params.get('rivals_handle') : '',
        year_begin: params.has('year_begin') ? parseInt(params.get('year_begin')) : 0,
        year_end: params.has('year_end') ? parseInt(params.get('year_end')) : 9999,
        years_begin: [
            { text: '最古', value: 0 }
        ].concat(getYears()),
        years_end: getYears().concat([
            { text: '最新', value: 9999 }
        ]),
        joi_sp: params.has('joi_sp') ? parseBoolean(params.get('joi_sp')) : true,
        joi_op: params.has('joi_op') ? parseBoolean(params.get('joi_op')) : true,
        apio: params.has('apio') ? parseBoolean(params.get('apio')) : true,
        ioi: params.has('ioi') ? parseBoolean(params.get('ioi')) : true,
        batch: params.has('batch') ? parseBoolean(params.get('batch')) : true,
        interactive: params.has('interactive') ? parseBoolean(params.get('interactive')) : true,
        communication: params.has('communication') ? parseBoolean(params.get('communication')) : true,
        output_only: params.has('output_only') ? parseBoolean(params.get('output_only')) : true,
        show_unavailable: params.has('show_unavailable') ? parseBoolean(params.get('show_unavailable')) : false,
        show_ac: params.has('show_ac') ? parseBoolean(params.get('show_ac')) : true,
        sort_key: params.has('sort_key') ? params.get('sort_key') : 'difficulty',
        sort_keys: [
            { 'text': '難易度順', value: 'difficulty' },
            { 'text': '出典順', value: 'source' },
        ],
        tasks: {},
        userStatus: {},
    },
    methods: {
        update: function () {
            params.set('my_handle', this.my_handle);
            params.set('rivals_handle', this.rivals_handle);
            params.set('year_begin', this.year_begin);
            params.set('year_end', this.year_end);
            params.set('joi_sp', this.joi_sp);
            params.set('joi_op', this.joi_op);
            params.set('apio', this.apio);
            params.set('ioi', this.ioi);
            params.set('batch', this.batch);
            params.set('interactive', this.interactive);
            params.set('communication', this.communication);
            params.set('output_only', this.output_only);
            params.set('show_unavailable', this.show_unavailable);
            params.set('show_ac', this.show_ac);
            params.set('sort_key', this.sort_key);
            window.location.replace(url.href);
        },
        updateTasks: function () {
            this.tasks = [];
            for (let task of tasks) {
                if (!(year_begin <= task.year && task.year <= year_end)) continue;
                if (task.comp == 'JOIsp' && !joi_sp) continue;
                if (task.comp == 'JOIop' && !joi_op) continue;
                if (task.comp == 'APIO' && !apio) continue;
                if (task.comp == 'IOI' && !ioi) continue;
                if (task.type == 'Batch' && !batch) continue;
                if (task.type == 'Interactive' && !interactive) continue;
                if (task.type == 'Communication' && !communication) continue;
                if (task.type == 'Output Only' && !output_only) continue;
                if (task.unavailable && !show_unavailable) continue;
                if (my_handle in this.userStatus
                    && this.userStatus[my_handle]['ac'].includes(task.id) && !show_ac) continue;

                if (my_handle in this.userStatus
                    && this.userStatus[my_handle]['ac'].includes(task.id))
                    task.status = 'ac';
                else if (my_handle in this.userStatus
                    && this.userStatus[my_handle]['wa'].includes(task.id))
                    task.status = 'wa';
                else task.status = 'none';

                task.rivals_status = [];
                for (const rival_handle of rivals_handle) {
                    if (rival_handle in this.userStatus
                        && this.userStatus[rival_handle]['ac'].includes(task.id))
                        task.rivals_status.push({ name: rival_handle, status: 'ac' });
                    else if (rival_handle in this.userStatus
                        && this.userStatus[rival_handle]['wa'].includes(task.id))
                        task.rivals_status.push({ name: rival_handle, status: 'wa' });
                    else task.rivals_status.push({ name: rival_handle, status: 'none' });
                }

                this.tasks.push(task);
            }

            if (sort_key == 'difficulty') this.tasks.sort((l, r) => {
                let lv = l.difficulty;
                if (lv == '') lv = 99;
                let rv = r.difficulty;
                if (rv == '') rv = 99;
                return lv - rv;
            });
            for (let task of this.tasks) {
                if (task.difficulty == 99) {
                    task.difficulty = '';
                }
            }
        },
        start: function () {
            this.updateTasks();

            const handles = [my_handle].concat(rivals_handle);
            for (let handle of handles) {
                fetch(`${BACKEND_URL}/${handle}`)
                    .then(response => response.json())
                    .then(data => {
                        app.userStatus[handle] = data;
                        this.updateTasks();
                    });
            }
        },
    },
});

app.start();