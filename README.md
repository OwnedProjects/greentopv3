# React + TypeScript + Vite

Changes Different than the original Application

- Database Changes
  - Added New Table `raw_material_type_master` with columns `rawmattypeid` and `type` ('material', 'bags')
  - Modified structure of `raw_material_master` to accept a new column `rawmattypeid`, this change will help in grouping of bags everywhere
  - Modified structure of `raw_material_master` to accept a new column `status`, this change will help in only displaying active raw materials everywhere
