
import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const { name, industry, city, country } = req.query;

    let filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (industry) filter.industry = industry;
    if (city) filter["location.city"] = { $regex: city, $options: "i" };
    if (country)
      filter["location.country"] = { $regex: country, $options: "i" };

    const companies = await Company.find(filter);
    res
      .status(200)
      .json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
