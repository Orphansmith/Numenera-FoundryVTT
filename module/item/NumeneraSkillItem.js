export class NumeneraSkillItem extends Item {
  get type() {
      return "skill";
  }

  prepareData() {
	  // Override common default icon
	  if (!this.data.img) this.data.img = 'icons/svg/book.svg';
		
      super.prepareData();

      const itemData = this.data.data || {};

      itemData.name = this.data ? this.data.name : "New Skill";
      itemData.notes = itemData.notes || "";
      itemData.stat = itemData.stat || "";
      itemData.inability = itemData.inability || false;
      itemData.trained = itemData.trained || false;
      itemData.specialized = itemData.specialized || false;
  }

  async updateRelatedAbility(ability) {
    //If it is not owned by an Actor, it has no related skill
    if (!this.actor || !ability)
      return;

    const updated = await ability.update({
      _id: ability._id,
      name: this.name,
      "data.data.cost.pool": this.data.stat,
    });

    ui.notifications.info("Related ability information updated");

    return updated;
  }
}