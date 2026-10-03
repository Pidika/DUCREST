'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const STORAGE_KEY = 'ducrest-privacy-v2';
const MAX_AGE = 90 * 24 * 60 * 60 * 1000;

export function PrivacyNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedAt = Number(window.localStorage.getItem(STORAGE_KEY));
    if (!savedAt || Date.now() - savedAt > MAX_AGE) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener('ducrest:privacy', reopen);
    return () => window.removeEventListener('ducrest:privacy', reopen);
  }, []);

  function saveChoice() {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? setOpen(true) : saveChoice())}>
        <DialogContent className="privacy-dialog" showCloseButton={false}>
          <DialogHeader>
            <div className="privacy-kicker">
              <ShieldCheck size={18} aria-hidden="true" />
              <span>Ducrest Partners · Privacy notice</span>
            </div>
            <DialogTitle>Cookies and your privacy</DialogTitle>
            <DialogDescription>
              This website uses only storage that is necessary to remember your privacy choice and
              support the site&apos;s basic operation.
            </DialogDescription>
          </DialogHeader>

          <div className="privacy-categories" aria-label="Technology used by this website">
            <div className="privacy-category">
              <div>
                <strong>Strictly necessary</strong>
                <span>Preference storage on this device · retained for 90 days</span>
              </div>
              <span className="privacy-status privacy-status-active">Always active</span>
            </div>
            <div className="privacy-category">
              <div>
                <strong>Analytics and performance</strong>
                <span>No visitor analytics or profiling</span>
              </div>
              <span className="privacy-status">Not in use</span>
            </div>
            <div className="privacy-category">
              <div>
                <strong>Advertising and targeting</strong>
                <span>No third-party advertising trackers</span>
              </div>
              <span className="privacy-status">Not in use</span>
            </div>
          </div>

          <p className="privacy-detail">
            Ducrest Partners does not use this website to profile visitors or share browsing data
            with advertisers. If optional services are introduced later, they will remain disabled
            until you are offered a new choice. You can review this notice again from the Privacy
            settings link in the footer.
          </p>

          <DialogFooter className="privacy-actions">
            <button className="button" type="button" onClick={saveChoice}>
              Use necessary cookies only
            </button>
            <Link className="privacy-policy-link" href="/privacy/" onClick={saveChoice}>
              Read the Privacy Policy
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}

export function PrivacyPreferences() {
  return (
    <button
      className="privacy-preferences"
      type="button"
      onClick={() => window.dispatchEvent(new Event('ducrest:privacy'))}
    >
      Privacy preferences
    </button>
  );
}
