const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    // find all categories
    const TagData = await Tag.findAll(
    {
      // be sure to include its associated Products
      include: [{ model: Product }, { model: ProductTag }],
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }



});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    // find one Tag by its `id` value
    const TagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }, { model: ProductTag }],
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new Tag
  try {
    const TagData = await Tag.create(req.body);
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a Tag by its `id` value
  try {
    const TagData = await Tag.update(
      { Tag_name: req.body.tag_name },
      { where: req.params.id }
    );

    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
