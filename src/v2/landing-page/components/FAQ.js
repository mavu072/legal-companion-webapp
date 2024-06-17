import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import JsxParser from 'react-jsx-parser';

const supportEmail = 'menityapps@gmail.com';

const faqs = [
    {
        "question": "What is AI Legal Companion?",
        "answer": "AI Legal Companion is a free, AI-powered platform designed to help South African employees understand and exercise their legal rights in the workplace."
    },
    {
        "question": "How does AI Legal Companion work?",
        "answer": "Users can describe their workplace issues or upload legal documents. Our AI analyzes relevant South African laws and provides tailored information, compliance ratings, and step-by-step guidance."
    },
    {
        "question": "Is AI Legal Companion free to use?",
        "answer": "Yes, AI Legal Companion offers all its features for free."
    },
    {
        "question": "What kind of workplace issues can AI Legal Companion help with?",
        "answer": "AI Legal Companion can assist with a variety of workplace issues, including unfair dismissal, unpaid wages, inappropriate behavior from coworkers or managers, and other employment-related concerns."
    },
    {
        "question": "How do I ensure my employment agreements comply with South African laws?",
        "answer": "You can upload your employment agreements to AI Legal Companion, and our AI will check them for compliance with South African laws. You'll receive a compliance rating and suggestions for any necessary changes."
    },
    {
        "question": "Is my personal data safe with AI Legal Companion?",
        "answer": "Yes, we prioritize your privacy and ensure compliance with the Protection of Personal Information Act (PoPIA). Your personal data is not shared with third parties without your consent."
    },
    {
        "question": "Does AI Legal Companion provide legal advice?",
        "answer": "No, AI Legal Companion is not an authorized legal practitioner and does not provide legal advice. The information provided by the platform is for informational and educational purposes only."
    },
    {
        "question": "How accurate is the information provided by AI Legal Companion?",
        "answer": "Our AI leverages a comprehensive library of South African employment laws to provide accurate and relevant information. However, users should consult a qualified legal professional for specific legal advice."
    },
    {
        "question": "Can I access AI Legal Companion on my mobile device?",
        "answer": "Yes, AI Legal Companion is accessible on both desktop and mobile devices, allowing you to use the platform conveniently from anywhere."
    },
    {
        "question": "How can I contact AI Legal Companion for support or feedback?",
        "answer": `We love hearing from our users! If you have any questions, feedback, or suggestions, please contact us at <Link>${supportEmail}</Link>.`
    }
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
      {faqs.map(({ question, answer }, index) => (
        <Accordion
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
          >
            <Typography component="h3" variant="subtitle2">
              {question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              <JsxParser components={{ Link }} jsx={ answer } />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </Box>
    </Container>
  );
}