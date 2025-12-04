// controllers/ideaController.js
const Idea = require('../models/Idea');
const User = require('../models/userModel'); // optional if you need user checks

// GET /api/ideas         -> get all ideas of current user
exports.getMyIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(ideas);
  } catch (err) {
    console.error('getMyIdeas error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/ideas        -> create idea (max 2 per user)
exports.createIdea = async (req, res) => {
  try {
    const { title, desc, tags } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // count existing ideas for the user
    const count = await Idea.countDocuments({ user: req.user._id });
    if (count >= 2) {
      return res.status(400).json({ message: 'You can only save up to 2 ideas' });
    }

    const idea = new Idea({
      user: req.user._id,
      title: title.trim(),
      desc: desc ? desc.trim() : '',
      tags: Array.isArray(tags) ? tags.map(String) : (typeof tags === 'string' && tags.length ? tags.split(',').map(t => t.trim()) : []),
    });

    await idea.save();
    return res.status(201).json(idea);
  } catch (err) {
    console.error('createIdea error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/ideas/:id     -> update idea (owner only)
exports.updateIdea = async (req, res) => {
  try {
    const ideaId = req.params.id;
    const { title, desc, tags } = req.body;

    const idea = await Idea.findById(ideaId);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });

    if (!idea.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (title) idea.title = title.trim();
    if (typeof desc !== 'undefined') idea.desc = desc ? desc.trim() : '';
    if (typeof tags !== 'undefined') {
      idea.tags = Array.isArray(tags) ? tags.map(String) : (typeof tags === 'string' && tags.length ? tags.split(',').map(t => t.trim()) : []);
    }

    idea.updatedAt = Date.now();
    await idea.save();

    return res.json(idea);
  } catch (err) {
    console.error('updateIdea error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/ideas/:id  -> delete idea (owner only)
exports.deleteIdea = async (req, res) => {
  try {
    const ideaId = req.params.id;
    const idea = await Idea.findById(ideaId);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });

    if (!idea.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await idea.deleteOne();
    return res.json({ message: 'Idea removed' });
  } catch (err) {
    console.error('deleteIdea error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
