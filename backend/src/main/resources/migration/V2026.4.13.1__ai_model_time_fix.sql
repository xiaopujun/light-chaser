update ai_model
set create_time = replace(create_time, 'T', ' '),
    update_time = replace(update_time, 'T', ' ')
where instr(create_time, 'T') > 0
   or instr(update_time, 'T') > 0;
