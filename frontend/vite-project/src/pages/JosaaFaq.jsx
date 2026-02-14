import React from 'react'

const faqs = [
  { q: '1. What is JoSAA 2025?', a: 'JoSAA (Joint Seat Allocation Authority) manages online seat allocation for IITs, NITs, IIEST, IIITs, and GFTIs for the 2025-26 academic year.' },
  { q: '2. Who is eligible to participate in JoSAA 2025?', a: 'Candidates with JEE Advanced 2025 qualification (for IITs) or JEE Main 2025 rank (for NIT+ system), along with required Class XII criteria, are eligible.' },
  { q: '3. Which institutes participate in JoSAA 2025?', a: 'IITs, NITs, IIEST, IIITs, Schools of Planning and Architecture, and other approved technical institutes participate.' },
  { q: '4. What examinations are used for admission?', a: 'IIT admissions are based on JEE Advanced 2025. NIT+ admissions are based on JEE Main 2025 ranks (B.E./B.Tech, B.Arch, or B.Plan as applicable).' },
  { q: '5. Is registration on the JoSAA portal mandatory?', a: 'Yes. Registration on the official JoSAA portal is required for seat allocation.' },
  { q: '6. If I qualified JEE Advanced 2025, do I still need JoSAA registration?', a: 'Yes. Registration is still mandatory for both IIT and NIT+ seat allocation through JoSAA.' },
  { q: '7. How are candidates categorized for seat allocation?', a: 'Allocation considers nationality, disability status, and reservation category such as GEN, GEN-EWS, OBC-NCL, SC, ST, and PwD variants.' },
  { q: '8. Can foreign candidates participate in JoSAA 2025?', a: 'Yes, foreign and OCI/PIO (F) candidates can participate for IIT supernumerary seats as per rules.' },
  { q: '9. Are supernumerary seats available for foreign candidates?', a: 'Yes. IITs offer foreign supernumerary seats under defined criteria. NIT+ seats are generally not available in this category.' },
  { q: '10. What rank lists are used for seat allocation?', a: 'IITs use JEE Advanced rank lists; NIT+ system uses JEE Main rank lists.' },
  { q: '11. What are supernumerary seats for female candidates?', a: 'These seats improve female representation and are available in female-only pools while female candidates can also compete in gender-neutral pools.' },
  { q: '12. How are OCI/PIO candidates treated?', a: 'OCI/PIO treatment depends on card issue date and selected status (OCI/PIO-I or OCI/PIO-F), which affects institute eligibility.' },
  { q: '13. How is a seat allocated?', a: 'Allocation is computerized and based on rank, category, preferences, seat availability, and JoSAA business rules.' },
  { q: '14. What is the role of mock seat allocation?', a: 'Mock rounds help estimate likely allotment based on current choices before final locking.' },
  { q: '15. Can I edit choices after locking?', a: 'You can unlock and edit before the deadline through portal OTP validation.' },
  { q: '16. Can I edit choices after the deadline?', a: 'No. Choice edits are not allowed after deadline.' },
  { q: '17. What if I save choices but do not lock them?', a: 'The last saved choices are auto-locked at deadline.' },
  { q: '18. What if multiple candidates have the same rank?', a: 'Tie-handling follows JoSAA rules. In special tie cases, additional handling may be applied as defined in business rules.' },
  { q: '19. How do I accept a provisionally allotted seat?', a: 'Select Freeze/Float/Slide, upload required documents, and pay Seat Acceptance Fee within deadline.' },
  { q: '20. What is the Seat Acceptance Fee (SAF)?', a: 'SAF is category-based (for example lower for SC/ST/PwD and higher for others). Non-payment leads to cancellation.' },
  { q: '21. What options are available after seat allocation?', a: 'Freeze, Float, and Slide.' },
  { q: '22. What do Freeze, Float, and Slide mean?', a: 'Freeze keeps current seat and exits upgrades. Float allows higher preferences across institutes. Slide allows higher preferences within same institute.' },
  { q: '23. Can I change Freeze/Float/Slide later?', a: 'Float can move to Slide/Freeze, Slide can move to Freeze before the allowed deadline. Freeze cannot be reverted.' },
  { q: '24. What if my allocated category changes to OPEN?', a: 'Your personal category does not change; only seat allocation category can change due to verification/rules.' },
  { q: '25. I got a seat but want a better one. What should I do?', a: 'Complete online reporting and choose Float or Slide.' },
  { q: '26. Can I revert to a previous seat after getting a higher one?', a: 'No. Previous seat gets cancelled when upgraded.' },
  { q: '27. I am satisfied with my seat. What should I do?', a: 'Choose Freeze and complete reporting.' },
  { q: '28. How to be considered for higher preference in any institute?', a: 'Choose Float.' },
  { q: '29. How to be considered for higher preference in the same institute?', a: 'Choose Slide.' },
  { q: '30. Can I change from Float/Slide to Freeze?', a: 'Yes, within the allowed rounds.' },
  { q: '31. Can I change from Freeze to Float/Slide?', a: 'No.' },
  { q: '32. What if I do not pay SAF?', a: 'Seat is cancelled and further participation is blocked as per rules.' },
  { q: '33. What is online reporting?', a: 'Online reporting means accepting the seat, document upload, SAF payment, and query resolution within timeline.' },
  { q: '34. What if I fail online reporting?', a: 'Seat gets cancelled and candidature exits JoSAA process.' },
  { q: '35. What documents are usually required?', a: 'Identity, DOB proof, Class XII documents, category/PwD certificates (if applicable), and other institute-specific documents.' },
  { q: '36. Do I need to report again if upgraded to another IIT?', a: 'Usually no, if IIT reporting was already completed and rules do not require fresh action.' },
  { q: '37. Do I need to report again if upgraded to another NIT+ institute?', a: 'Usually no, if NIT+ reporting was already completed.' },
  { q: '38. If I move from IIT to NIT+, do I need to report again?', a: 'Yes. Cross-system movement may require fresh reporting and verification.' },
  { q: '39. If I move from NIT+ to IIT, do I need to report again?', a: 'Yes. Fresh IIT-side verification/reporting is required.' },
  { q: '40. How can I withdraw to remain eligible for JEE Advanced next year?', a: 'Withdraw within the official JoSAA withdrawal window; missing deadline can affect eligibility conditions.' },
  { q: '41. What is State Code of Eligibility?', a: 'For NIT+ admissions, it is based on where Class XII (or equivalent) was first passed.' },
  { q: '42. What if category documents are invalid?', a: 'Seat/category can change or candidature may be cancelled based on verification outcomes.' },
  { q: '43. Do PwD candidates with valid UDID need physical verification?', a: 'Usually no, unless online verification fails or special conditions apply.' },
  { q: '44. Do PwD candidates without UDID need physical verification?', a: 'Yes, physical verification is generally required.' },
  { q: '45. What if PwD status is invalid after availing scribe/compensatory time?', a: 'Candidature can be cancelled as per governing rules.' },
  { q: '46. What is IIT PwD verification procedure for JEE Advanced candidates?', a: 'Candidates without valid UDID typically undergo physical verification at designated IIT centers.' },
  { q: '47. If compensatory time was used in JEE Main but not in JEE Advanced, what happens?', a: 'Verification requirement depends on UDID validity and applicable rules.' },
  { q: '48. Procedure for less than 40 percent disability with writing difficulty (IIT)?', a: 'Physical verification may be needed when scribe/compensatory provisions were used.' },
  { q: '49. Less than 40 percent disability without compensatory time (IIT): verification required?', a: 'Generally no physical verification for PwD-seat claim in this case.' },
  { q: '50. Less than 40 percent disability without compensatory time (NIT+): verification required?', a: 'Generally no physical verification for PwD-seat claim in this case.' },
  { q: '51. If PwD verification fails but SC/ST is valid, do I pay extra SAF?', a: 'Normally no extra SAF if applicable category fee condition is already met.' },
  { q: '52. Can OCI/PIO status be corrected if entered as Indian by mistake?', a: 'Yes, correction is possible through portal process, subject to document validation.' },
  { q: '53. Can OCI/PIO status be corrected if entered as foreign by mistake?', a: 'Yes, portal correction may be allowed as per eligibility rules.' },
  { q: '54. Can an Indian citizen change nationality from OCI/PIO to Indian?', a: 'Yes, with valid proof and subject to portal timelines.' },
  { q: '55. Can an Indian citizen change nationality from foreign to Indian?', a: 'Yes, if supported by valid documents and approved process.' },
  { q: '56. Can a foreigner correct nationality if entered incorrectly?', a: 'Yes, corrections are allowed through official process with valid evidence.' },
  { q: '57. Can I withdraw after accepting a seat?', a: 'Yes, withdrawal is allowed during the specified rounds and deadlines.' },
  { q: '58. Can I exit if I have not been allotted a seat?', a: 'Yes, you can choose Exit within allowed timeline.' },
  { q: '59. How many rounds of JoSAA seat allocation are there?', a: 'Typically six JoSAA rounds, followed by CSAB special rounds for NIT+ seats.' },
  { q: '60. If allotted IIT seat in final round and I do not join, can I attempt JEE Advanced next year?', a: 'This depends on prevailing eligibility policy and seat acceptance/reporting status.' },
  { q: '61. Difference between Withdraw and Exit?', a: 'Withdraw is for candidates with allotted seat; Exit is for candidates without allotment who want to leave process.' },
  { q: '62. If I withdraw from IIT, will I still be considered for NIT+?', a: 'No. Withdrawal generally exits the complete JoSAA process.' },
  { q: '63. Is there a spot round for IITs after round 6?', a: 'No IIT spot round under JoSAA after final round.' },
  { q: '64. Can I hold one IIT seat and one NIT+ seat simultaneously?', a: 'No. Only one seat can be held at a time in JoSAA rounds.' },
  { q: '65. What if Class XII result changes after choice locking?', a: 'Eligibility is re-evaluated; seat may be cancelled or considered in later rounds as per rules.' },
  { q: '66. Will I get refund if I withdraw?', a: 'Refund is generally processed after deduction of applicable processing/withdrawal charges.' },
  { q: '67. What is Partial Admission Fee (PAF)?', a: 'PAF is an additional payment applicable for NIT+ candidates after final JoSAA round.' },
  { q: '68. Do I need to pay PAF?', a: 'Yes, if your allotted seat falls under NIT+ system and rules require it.' },
  { q: '69. What if I do not pay PAF?', a: 'Seat may be treated as rejected/cancelled.' },
  { q: '70. To participate in CSAB Special Round, do I need to pay PAF?', a: 'If you want to retain JoSAA NIT+ seat, PAF conditions apply as per current CSAB rules.' },
  { q: '71. Can I participate in CSAB after JoSAA?', a: 'Yes. Check official details at https://csab.nic.in.' },
]

export default function JosaaFaq() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-36 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none fixed"></div>
      <div className="container mx-auto max-w-4xl relative z-10">
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            JoSAA FAQ Guide
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Key answers about eligibility, seat allocation, Freeze/Float/Slide,
            reporting, withdrawal, SAF/PAF, PwD verification, and CSAB flow.
          </p>
        </section>

        <section className="space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm open:shadow-md transition-all"
            >
              <summary className="cursor-pointer list-none p-5 md:p-6 font-bold text-slate-800 flex items-center justify-between gap-4">
                <span>{item.q}</span>
                <span className="text-slate-400 text-xl leading-none">+</span>
              </summary>
              <div className="px-5 md:px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100">
                <p className="pt-4">{item.a}</p>
              </div>
            </details>
          ))}
        </section>

        <p className="mt-12 text-center text-sm text-slate-500 border-t border-slate-200 pt-6">
          Disclaimer: This page is a simplified summary. Always verify final
          rules, dates, and fees on the official JoSAA/CSAB portals.
        </p>
      </div>
    </div>
  )
}
